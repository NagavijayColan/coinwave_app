import { Component, ViewChild } from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from '../data-table';
// import { films } from './data-table-demo3-data';


@Component({
  selector: 'data-table-sort-expands',
  templateUrl: './data-table-sort-expand.html',
  styleUrls: ['./data-table-sort-expand.css']
})
export class DataTableSortExpand {

    //filmResource = new DataTableResource(films);
    //films = [];
    public films:any[];
    public filmResource:any;
    filmCount = 0;

    @ViewChild(DataTable) filmsTable;

    constructor() {
       this.films = [
            // { title: 'The Shawshank Redemption', year: 1994, rating: 9.2, director: 'Frank Darabont', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},

            { coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
            
            { coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},

            { coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
            
            { coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
    
            { coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},

            { coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},

            { coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
            
            { coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},

            { coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
            
            { coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
    
            { coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},

            { coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},

            { coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
            
            { coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},

            { coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
            
            { coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
    
            { coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},

            { coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
              
        ];
        this.filmResource = new DataTableResource(this.films);
        this.filmResource.count().then(count => this.filmCount = count);
    }

    reloadFilms(params) {
        this.filmResource.query(params).then(films => this.films = films);
    }

    cellColor(car) {
        return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7)/1.3)*100)) + ')';
    };

    // special params:

    translations = <DataTableTranslations>{
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };
}
