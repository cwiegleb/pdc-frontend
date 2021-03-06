import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment'

@Injectable()
export class DealerUploadService {

  private uploadUrl = `${environment.serviceEndpointDealerUpload}/dealers-upload`;

  constructor(private http: Http) {
  }

  uploadDealerDetails(body: FormData): Promise<string> {
    return this.http
      .post(this.uploadUrl, body)
      .toPromise()
      .then((response) => {
        console.log('Upload response ', response);
        return 'upload successful';
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
