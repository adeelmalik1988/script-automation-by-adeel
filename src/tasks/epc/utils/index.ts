import { promises as fs } from 'fs';

export const RemoveQuotes = (input: string): string => {

    if(input.startsWith('"') && input.endsWith('"') ) {
        return input.slice(1,-1);

    }

    return input
}

export async function AppendLineToFile(filePath: string, line: string | String[] | undefined): Promise<void> {
    try {
      await fs.appendFile(filePath, line + '\n', 'utf8');
    } catch (error) {
      console.error('Error appending line to file:', error);
    }
  }