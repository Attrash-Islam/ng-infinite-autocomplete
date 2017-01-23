
/**
 * AutocompleteDirectiveScope interface
 * @author Islam Attrash
 */
export interface IAutocompleteDirectiveScope extends ng.IScope {
    data:Array<any>;
    fetchSize:number;
    onSelect:Function;
    getDataFromApi:Function;
}
