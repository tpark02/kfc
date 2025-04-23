// types/PlayerPage.ts
import { Player } from "./Player";

export type ResponsePlayerPage = {
  content: Player[];
  totalPages: number;
  totalElements: number;
  number: number; // 현재 페이지 번호
  size: number; // 한 페이지당 개수
};
