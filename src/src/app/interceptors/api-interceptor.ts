import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";
import { MessageService } from "../services/message.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loaderService.setLoading(true, request.url);
    return next.handle(request)
      .pipe(catchError((error) => {
        this.messageService.showErrorMessage(error);
        this.loaderService.setLoading(false, request.url);
        return throwError(error);
      }))
      .pipe(map<unknown, any>(event => {
        if (event instanceof HttpResponse) {
          this.loaderService.setLoading(false, request.url);
        }
        return event;
      }));
  }
}