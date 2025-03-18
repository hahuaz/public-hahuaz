import { writeFile, readFile } from "fs/promises";
import path from "path";

import * as googleTTS from "@google-cloud/text-to-speech";
import ffmpeg from "fluent-ffmpeg";

import { wait } from "@repo/lib";
import { APP_CONFIG } from "../config.js";
ffmpeg.setFfmpegPath("/usr/bin/ffmpeg"); // Use the actual path from `which ffmpeg`

const client = new googleTTS.TextToSpeechClient({
  apiKey: APP_CONFIG.GOOGLE_SPEECH_KEY,
});

//TODO: google chirp3 voices doesn't support ssml for now. when it does, remove concatFile and silenceFile and use ssml to add silence between sentences
export async function useGoogleTTS({
  inputFile,
  outputFile,
}: {
  inputFile: string;
  outputFile: string;
}) {
  // starting from left to right, quality of voices decreases
  const voices = ["en-US-Chirp3-HD-Leda", "en-US-Chirp3-HD-Aoede"];
  const voiceName = voices[0];
  const silenceFile = path.join(process.cwd(), "3sec-silence.wav");
  const tempDir = path.join(process.cwd(), "temp");
  const concatFile = path.join(tempDir, "concat.txt");

  const text = await readFile(inputFile, "utf-8");
  const sentences = text.split("\n").filter(Boolean);
  const tempFiles: string[] = [];

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    console.log(`Processing: ${sentence}`);

    const [response] = await client.synthesizeSpeech({
      input: { text: sentence },
      audioConfig: {
        audioEncoding: "LINEAR16", // Use WAV (16-bit PCM)
        pitch: 0,
        speakingRate: 1,
      },
      voice: {
        languageCode: "en-US",
        name: voiceName,
      },
    });

    if (!response?.audioContent) {
      throw new Error("No audio content found in response.");
    }

    const tempWavFile = path.join(tempDir, `${i}.wav`);
    await writeFile(tempWavFile, response.audioContent, "binary");
    tempFiles.push(tempWavFile);

    // wait 1 sec to not exhaust the google api
    await wait(1000);
  }

  const finalFile = `${outputFile}-${voiceName}.wav`;

  // generate concat file for ffmpeg
  const concatContent = tempFiles
    .map((file) => `file '${file}'\nfile '${silenceFile}'\n`)
    .join("");

  await writeFile(concatFile, concatContent);

  // merge without re-encoding
  // This command executes the FFmpeg binary, which must be installed and accessible in the system's PATH. Ensure FFmpeg is properly installed and can be invoked via the command line using `ffmpeg`.
  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(concatFile) // Ensure all input file paths are absolute; otherwise, FFmpeg will process only up to the first relative path and silently ignore the rest, return uncomplete output
      .inputOptions(["-f concat", "-safe 0"])
      .outputOptions(["-c copy"]) // Keep original quality
      .output(finalFile)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });

  console.log(`success: ${finalFile}`);
}
