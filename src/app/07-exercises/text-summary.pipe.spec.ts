import { TextSummaryPipe } from './text-summary.pipe';

describe('textSummaryPipe', () => {
  const pipe = new TextSummaryPipe();

  it('should return empty string if no text', () => {
    const result = pipe.transform(undefined);

    expect(result).toBe('');
  });

  it('should assume the limit is 10 if limit is not provided', () => {
    const result = pipe.transform('Thanks God ');

    expect(result).toBe('Thanks God...');
  });

  it('should return the same string if the length of input is less than the limit', () => {
    const result = pipe.transform('12345', 5);

    expect(result).toBe('12345');
  });

  it('should summarize the input if it is longer than the limit', () => {
    const result = pipe.transform('123456789', 5);

    expect(result).toBe('12345...');
  });

  it("should return 10 chars plus '...' if the text length is more than 10", () => {
    const result = pipe.transform('1234567891011');

    expect(result).toContain('...');
  });
});
