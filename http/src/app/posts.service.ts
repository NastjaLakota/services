import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject, catchError, throwError, tap } from "rxjs";
import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    // Send Http request
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        "https://http-section18-l255-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        postData,
        {
          observe: "response",
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let seatchParams = new HttpParams();
    seatchParams = seatchParams.append("print", "pretty");
    seatchParams = seatchParams.append("custom", "key");
    return this.http
      .get<{ [key: string]: Post }>(
        "https://http-section18-l255-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        {
          headers: new HttpHeaders({ "Custom-Header": "Hello" }),
          params: seatchParams,
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          // send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(
        "https://http-section18-l255-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        {
          observe: "events",
          responseType: "json",
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
