/**
 * Course type.
 */
export type Course = {
  /**
   * 科目名
   */
  name: string

  /**
   * 学部・研究科
   */
  faculty: string

  /**
   * 登録番号
   */
  number: string

  /**
   * 科目ソート
   */
  sort: string

  /**
   * 分野
   */
  field: string

  /**
   * 単位
   */
  units: number

  /**
   * K-Number
   */
  kNumber: string

  /**
   * 年度
   */
  year: number

  /**
   * 学期
   */
  semester: string

  /**
   * 前半・後半
   */
  subSemester: string

  /**
   * 授業教員名
   */
  teacherNames: string[]

  /**
   * 実施形態
   */
  communicationType: string

  /**
   * 授業形態
   */
  styles: string[]

  /**
   * 曜日・時限
   */
  dates: {
    day: string
    time: string
  }[]

  /**
   * 授業で使う言語
   */
  language: string

  /**
   * 研究会テーマ
   */
  researchTheme?: string

  /**
   * 概要
   */
  outline?: string

  /**
   * シラバスリンク
   */
  syllabusPath?: string
}
