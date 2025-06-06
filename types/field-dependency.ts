export interface FieldDependency {
  dependencyId: number
  entityName: string
  fieldName: string
  value: string
  dependentFieldName: string
  parentDependencyId: number
  changeUser: string
  changeDate: number
}
