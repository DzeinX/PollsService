import { CodeMessageEnum } from '../enums/codeMessage.enum';

export interface MessageInterface {
  message: string;
  code: CodeMessageEnum;
}