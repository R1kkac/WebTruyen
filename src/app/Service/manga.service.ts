import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, lastValueFrom, tap } from 'rxjs';
import { DataCategories, MangaDefault, PageNumber, Topmangadefault } from './repositores/injectable';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  private ApiUrl='https://localhost:7132/Truyen-tranh';
  private ApiServiceUrl='https://localhost:7132/Services';

  constructor(private http: HttpClient, private mangadefault: MangaDefault, private CategoriesService: DataCategories,
     private Page: PageNumber, private Topmanga: Topmangadefault) { }

  GetMangaDefault(): Observable<any>{
    const url= `${this.ApiUrl}/GetAllManga/1`;
    return this.http.get(url).pipe(tap((item:any)=>{
      this.mangadefault.sendData(item);
    }),catchError((error: any)=>{
      throw error;
    }));
  }
  GetTopMangaDefault(){
    const url= `${this.ApiUrl}/Topmanga`;
    this.http.get(url).subscribe((item: any)=>{
      this.Topmanga.sendData(item);
    })
  }
  async GetListCategories(): Promise<any>{
    const url = `${this.ApiUrl}/Category/Getall`;
    try{
      const result= this.http.get(url);
      const data: any = await lastValueFrom(result);
      this.CategoriesService.sendData(data);
    }catch(error){
      throw error;
    }
  }
  async GetPageNumber(): Promise<any>{
    const url = `${this.ApiUrl}/GetPageNumber`;
    try{
      const result= this.http.get(url);
      const data: any = await lastValueFrom(result);
      this.Page.sendData(data);
    }catch(error){
      throw error;
    }
  }
  GetMangaByCategories(id: string, pagenumber: any, pagesize: any): Observable<any>{
    const url= `${this.ApiUrl}/GetmangabyCategory/${id}/${pagenumber}/${pagesize}`;
    return this.http.get(url);
  }
  GetMangaInfo(MangaId: string): Observable<any>{
    const url= `${this.ApiUrl}/Details/${MangaId}`;
    return this.http.get(url);
  }
  GetmangabyType(type: any, pagenumber: number, pagesize: number): Observable<any>{
    const url= `${this.ApiUrl}/topmanga_by_type/${type}/${pagenumber}/${pagesize}`;
    return this.http.get(url);
  }
  GetdataChapter(MangaId: any, ChapterId: any): Observable<any>{
    const url= `${this.ApiUrl}/${MangaId}/${ChapterId}/getDsImage`;
    return this.http.get(url);
  }
  GetListChapterByManga(MangaId: any): Observable<any>{
    const url= `${this.ApiUrl}/${MangaId}/GetChapter`;
    return this.http.get(url);
  }
  GetMangaByListCategories(Listcategories: any): Observable<any>{
    let params = new HttpParams();
    Listcategories.forEach((item: any) => {
      console.warn(item);
        params= params.append('List', item.genreId);
     });
     const url= `${this.ApiUrl}/GetMangaByListCategories`;
     return this.http.get(url,{params: params})
  }
  //Phải thỏa tất cả thể loại
  GetMangaByListCategoriesWithAllCategories(Listcategories: any): Observable<any>{
    let params = new HttpParams();
    Listcategories.forEach((item: any) => {
      console.warn(item);
        params= params.append('List', item.genreId);
     });
     const url= `${this.ApiUrl}/get_manga_all_categories`;
     return this.http.get(url,{params: params})
  }
  GetmangaByPage(page: any): Observable<any>{
    const url = `${this.ApiUrl}/GetAllManga/${page}`;
    return this.http.get(url);
  }
  Mangasearch(value: string): Observable<any>{
    const url= `${this.ApiUrl}/SearchMangaV2/${value}`;
    return this.http.get(url);
  }
  GetlistCommentManga(Mangaid: any, pagesize: number, pagenumber: number): Observable<any>{
    const url= `${this.ApiServiceUrl}/manga_comment_manga/${Mangaid}/${pagesize}/${pagenumber}`;
    return this.http.get(url);
  }
  GetAllMangaByTYpe(type: any, pagesize: any, pagenumber:any): Observable<any>{
    const url=`${this.ApiUrl}/all_manga_by_type/${type}/${pagenumber}/${pagesize}`;
    return this.http.get(url);
  }
  GetNumberManga():Observable<any>{
    const url=`${this.ApiUrl}/number_all_manga`;
    return this.http.get(url);
  }
}

