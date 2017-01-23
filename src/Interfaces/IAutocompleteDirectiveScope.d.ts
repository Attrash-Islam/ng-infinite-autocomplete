
/**
 * AutocompleteDirectiveScope interface
 * @author Islam Attrash
 */
export interface IAutocompleteDirectiveScope extends ng.IScope {
    /**
     * Bounded data on the directive scope
     */
    data:Array<any>;
    /**
     * Bounded fetchSize on the directive scope
     */
    fetchSize:number;
    /**
     * Bounded onSelect on the directive scope
     */
    onSelect:Function;
    /**
     * Bounded getDataFromApi on the directive scope
     */
    getDataFromApi:Function;
    /**
     * Bounded mutable status on the directive scope
     */
    mutable:boolean;
}
