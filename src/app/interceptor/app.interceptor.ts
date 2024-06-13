import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {MessageService} from "primeng/api";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let modifiedReq = req;

        switch (req.method) {
            case 'GET':
                // Process GET request
                this.messageService.add({ severity: 'info', summary: 'Loading', detail: 'Fetching data...' });
                break;
            case 'POST':
                // Process POST request
                this.messageService.add({ severity: 'info', summary: 'Sending', detail: 'Posting data...' });
                break;
            case 'PUT':
                // Process PUT request
                this.messageService.add({ severity: 'info', summary: 'Updating', detail: 'Updating data...' });
                break;
            case 'DELETE':
                // Process DELETE request
                this.messageService.add({ severity: 'info', summary: 'Deleting', detail: 'Deleting data...' });
                break;
            default:
                console.log('Processing other request before sending');
                break;
        }

        return next.handle(modifiedReq).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        switch (req.method) {
                            case 'GET':
                                // Process GET response
                                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data loaded.' });
                                break;
                            case 'POST':
                                // Process POST response
                                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data sent.' });
                                break;
                            case 'PUT':
                                // Process PUT response
                                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data updated.' });
                                break;
                            case 'DELETE':
                                // Process DELETE response
                                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data deleted.' });
                                break;
                            default:
                                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Done.' });
                                break;
                        }
                    }
                },
                error => {
                    // Handle errors here
                    this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Oops! Something went wrong...' });
                }
            )
        );
    }
}
