// eslint-disable-next-line max-len
export const replaceEmailTemplateWithValues = (template: string, replacementsMap: any) => template.replace(/__[a-zA-Z]+__/g, match => replacementsMap[match] ?? match);
