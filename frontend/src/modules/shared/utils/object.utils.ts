export const removeIdField = (data: any) => {
  return {
    ...data,
    ...(data?.id && undefined),
  }
}
