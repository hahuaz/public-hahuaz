type BookId = string;

class Book {
  readonly id: BookId;
  readonly title: string;
  readonly author?: string;

  private tokens: string[];
  /**
   * Cache: stringified phrase tokens => occurrence count.
   * NOTE: Map keys are strings, not arrays; arrays compare by reference.
   */
  private phraseCountCache: Map<string, number>;

  constructor(args: {
    id: BookId;
    title: string;
    text: string;
    author?: string;
  }) {
    this.id = args.id;
    this.title = args.title;
    this.author = args.author;
    this.tokens = this.tokenize(args.text);
    this.phraseCountCache = new Map();
  }

  /**
   * Count single- or multi-word phrase occurrences using a sliding window.
   * Example: "Harry Potter"
   */
  countPhrase(givenPhrase: string): number {
    const phraseTokens = this.tokenize(givenPhrase).filter(Boolean);
    if (phraseTokens.length === 0) return 0;

    const phrase = phraseTokens.join("\u0001"); // unlikely delimiter
    const cached = this.phraseCountCache.get(phrase);
    if (cached !== undefined) return cached;

    const arr1 = this.tokens;
    const arr2 = phraseTokens;

    let count = 0;
    for (let i = 0; i <= arr1.length - arr2.length; i++) {
      let match = true;
      for (let j = 0; j < arr2.length; j++) {
        if (arr2[j] !== arr1[i + j]) {
          match = false;
          break;
        }
      }
      if (match) count++;
    }

    // save for future quick lookup
    this.phraseCountCache.set(phrase, count);

    return count;
  }

  /**
   * Tokenize text into words for indexing and searching.
   * Input: "Harry Potter and the Phoenix"
   * Output: ["harry", "potter", "and", "the", "phoenix"]
   */
  private tokenize(text: string): string[] {
    // Simple "letters or numbers" chunks, Unicode-aware
    const tokens = text.match(/[\p{L}\p{N}]+/gu) ?? [];
    return tokens.map(this.normalizeCase);
  }

  /**
   * Normalize for case-insensitive matching. NFC helps stabilize Unicode.
   */
  private normalizeCase(s: string): string {
    return s.normalize("NFC").toLocaleLowerCase();
  }
}

class BookStore {
  private books = new Map<BookId, Book>();

  addBook(args: {
    id: BookId;
    title: string;
    text: string;
    author?: string;
  }): void {
    if (this.books.has(args.id))
      throw new Error(`Book with id ${args.id} exists`);
    this.books.set(args.id, new Book(args));
  }

  /** Count occurrences of a (possibly multi-word) character name in a specific book. */
  countCharacterInBook(bookId: BookId, characterName: string): number {
    const book = this.books.get(bookId);
    if (!book) throw new Error(`Unknown book: ${bookId}`);
    return book.countPhrase(characterName);
  }

  /** Lightweight list view (id/title/author). */
  listBooks(): Array<{ id: BookId; title: string; author?: string }> {
    return Array.from(this.books.values()).map((b) => ({
      id: b.id,
      title: b.title,
      author: b.author,
    }));
  }
}

/* =========================
   Example Usage
   ========================= */

const store = new BookStore();

store.addBook({
  id: "hp1",
  title: "Harry Potter and the Sorcerer's Stone",
  author: "J. K. Rowling",
  text: `
    Mr and Mrs Dursley, of number four, Privet Drive, were proud to say
    that they were perfectly normal, thank you very much. Harry Potter lived...
    Harry Potter met Hagrid. Potter, Harry!
  `,
});

store.addBook({
  id: "lotr1",
  title: "The Fellowship of the Ring",
  author: "J. R. R. Tolkien",
  text: `
    When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating
    his eleventy-first birthday... Frodo Baggins ... Gandalf ...
  `,
});

// List available books
console.log(store.listBooks());
// → [ { id: 'hp1', title: "Harry Potter and the Sorcerer's Stone", author: 'J. K. Rowling' },
//     { id: 'lotr1', title: 'The Fellowship of the Ring', author: 'J. R. R. Tolkien' } ]

// Count phrase occurrences in a specific book (case-insensitive, Unicode-aware)
const countHP = store.countCharacterInBook("hp1", "Harry Potter");
console.log(`"Harry Potter" in hp1:`, countHP);

// Single-word also works
const countFrodo = store.countCharacterInBook("lotr1", "Frodo");
console.log(`"Frodo" in lotr1:`, countFrodo);
