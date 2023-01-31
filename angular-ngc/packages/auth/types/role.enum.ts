export enum Role {
  Admin = 1,
  Evaluator = 4,
  CaseManager = 6,
  TemplateAdmin = 7,
}

export const UnitRoles: { id: number; name: string }[] = [
  { id: Role.Admin, name: 'Administrator' },
  { id: Role.CaseManager, name: 'Case Manager' },
  { id: Role.TemplateAdmin, name: 'Template Administrator' },
];
