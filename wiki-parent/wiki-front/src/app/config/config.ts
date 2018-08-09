import { HttpHeaders } from '@angular/common/http';

export const restRootUrl = 'http://localhost:8080/wiki-back/rest';

export const httpJsonOptions = {
    headers: new HttpHeaders( {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
  };
