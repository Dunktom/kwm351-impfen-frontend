export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const LocationFormErrorMessages = [
  new ErrorMessage(
    'name',
    'required',
    'Ein Standortname muss angegeben werden.'
  ),
  new ErrorMessage('city', 'required', 'Ein Stadtname muss angegeben werden.'),
  new ErrorMessage(
    'street',
    'required',
    'Ein Straßenname muss angegeben werden.'
  ),
  new ErrorMessage(
    'housenumber',
    'required',
    'Ein Hausnummer muss angegeben werden.'
  ),
  new ErrorMessage(
    'zipcode',
    'required',
    'Eine Postleitzahl muss angegeben werden.'
  ),
  new ErrorMessage(
    'zipcode',
    'min',
    'Die Postleitzahl muss genau 4 Zeichen enthalten'
  ),
  new ErrorMessage(
    'zipcode',
    'max',
    'Die Postleitzahl muss genau 4 Zeichen enthalten'
  )
];
