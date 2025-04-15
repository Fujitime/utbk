import { questionBank } from "./index"

export function getQuestionsFromBank(subtest: string, count: number) {
  const source = questionBank[subtest]
  if (!source) throw new Error(`Subtes "${subtest}" tidak ditemukan.`)

  return source.slice(0, count).map((q, i) => ({ ...q, id: i + 1 }))
}
