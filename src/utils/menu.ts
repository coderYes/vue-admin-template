export interface IMenuType {
  id: number
  name: string
  path: string
  hidden: boolean
  icon: string
  componentPath: string
  children?: IMenuType[]
}
