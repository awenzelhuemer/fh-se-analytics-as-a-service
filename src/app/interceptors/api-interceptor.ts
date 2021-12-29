import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

constructor(private loaderService: LoaderService) {

}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.loaderService.setLoading(true, request.url);
        return next.handle(request)
          .pipe(catchError((error) => {
            console.error(`Error performing request, status code = ${error.status}`);
            this.loaderService.setLoading(false, request.url);
            return error;
          }))
          .pipe(map<unknown, any>(event => {
            if (event instanceof HttpResponse) {
              this.loaderService.setLoading(false, request.url);
            }
            return event;
          }));
    }
}