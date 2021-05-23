export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const AppointmentFormErrorMessages = [
  new ErrorMessage(
    'date',
    'required',
    'Bitte wählen Sie ein Datum für den Termin.'
  ),
  new ErrorMessage(
    'maxUser',
    'required',
    'Es muss eine maximale Anzahl an Besuchern eingegeben werden.'
  ),
  new ErrorMessage(
    'location_id',
    'required',
    'Bitte wählen Sie einen Standort für den Termin.'
  )
];
