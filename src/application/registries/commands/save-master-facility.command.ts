export class SaveMasterFacilityCommand {
  constructor(
    public readonly _id: string,
    public readonly code: number,
    public readonly name: string,
    public readonly county?: any,
    public readonly mechanism?: any,
  ) {
  }
}
