import {Injectable} from '@angular/core';

import {PagedData} from './model/paged-data';

import {Page} from './model/page';
import { Observable } from 'rxjs/';
import { Modeloinfo } from './model/modelobase';




/**
 * A server used to mock a paged data result from a server
 */
@Injectable()
export class ServicesService {
/*
    /**
     * A method that mocks a paged server response
     * @param page The selected page
     * @returns {any} An observable containing the employee data
     */

     urldata = 'https://data.nasa.gov/resource/9g7e-7hzz.json';
}
