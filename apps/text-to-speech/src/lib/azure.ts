import fs from "fs"; // Correct import for createWriteStream
import { pipeline } from "stream/promises";

import { PassThrough } from "node:stream";
import sdk from "microsoft-cognitiveservices-speech-sdk";

import { APP_CONFIG } from "@/config.js";

export async function useAzure({
  textPath,
  outputFile,
}: {
  textPath: string;
  outputFile: string;
}) {
  let text = await fs.promises.readFile(textPath, { encoding: "utf8" });
  text = text
    .split("\n")
    .map((sentence) => {
      return `${sentence} <break time="2000" />`;
    })
    .join(" ");

  const speechConfig = sdk.SpeechConfig.fromSubscription(
    APP_CONFIG.AZURE_SPEECH_KEY,
    APP_CONFIG.AZURE_SPEECH_REGION
  );

  const voices = {
    "en-US-AvaMultilingualNeural": "en-US-AvaMultilingualNeural",
    "en-US-EmmaMultilingualNeural": "en-US-EmmaMultilingualNeural",
    "en-US-JennyNeural": "en-US-JennyNeural",
    "en-US-SaraNeural": "en-US-SaraNeural",
  };

  const voice = voices["en-US-AvaMultilingualNeural"];
  const outputLocation = `${outputFile}-${voice}.webm`;

  // change the quality of output
  speechConfig.speechSynthesisOutputFormat =
    sdk.SpeechSynthesisOutputFormat.Audio48Khz192KBitRateMonoMp3;

  // Create the speech synthesizer.
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

  // not all voices support style
  const voiceStyle = "Default";

  // TODO don't work with cb. promisfy it
  synthesizer.speakSsmlAsync(
    `<speak 
  xmlns="http://www.w3.org/2001/10/synthesis" 
  xmlns:mstts="http://www.w3.org/2001/mstts" 
  xmlns:emo="http://www.w3.org/2009/10/emotionml" 
  version="1.0" 
  xml:lang="en-US">
  
    <voice name="${voice}">
      <mstts:express-as style="${voiceStyle}">
        <prosody rate="-10%" pitch="0%">${text}</prosody>
      </mstts:express-as>
    </voice>
  </speak>`,
    async (speakSsmlAsyncResult) => {
      // console.log("speakSsmlAsyncResult", speakSsmlAsyncResult);
      // @ts-expect-error privErrorDetails is private
      const { audioData, privErrorDetails } = speakSsmlAsyncResult;
      if (privErrorDetails) {
        return console.log("privErrorDetails", privErrorDetails);
      }

      // Create a readable stream from the Opus (audio) buffer
      const readStream = new PassThrough(); // Creates a PassThrough stream (a type of Transform stream that simply passes data through)
      readStream.end(Buffer.from(audioData)); // Converts the audio data into a Buffer and writes it to the stream, signaling the end of the stream

      // Create a writable stream to save the audio file
      const writeStream = fs.createWriteStream(outputLocation);

      // Pipe the readable stream to the writable stream
      await pipeline(readStream, writeStream);

      console.log("File saved successfully");
    },
    (error) => {
      console.log("err", error);
      synthesizer.close();
    }
  );
}
