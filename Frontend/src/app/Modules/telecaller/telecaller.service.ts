import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asianet } from './Models/asianet_base';
import { Bajaj } from './Models/bajaj_base';
import { Vi } from './Models/vi_base';
import { AsianetFollowup } from './Models/asianet_followup';
import { BajajFollowup } from './Models/bajaj_followup';
import { ViFollowup } from './Models/vi_followup';
import { AsianetSaleFollowup } from './Models/asianet_sales_followup';
import { ViCollection } from './Models/vi_collection_base';
import { ViCollectionFollowup } from './Models/vi_collection_followup';
import { AsianetSalesBase } from './Models/asianet_sales_base';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelecallerService {

  constructor(private _http:HttpClient) { }

  url = environment.baseUrl



  // BAJAJ

  getBajajCaller(): Observable<Bajaj[]>{
    return this._http.get<Bajaj[]>(this.url + '/bajaj/caller');
  }

  getBajajById(id: number): Observable<Bajaj>{
    return this._http.get<Bajaj>(this.url + '/bajaj/' +id);
  }

  updateBajajResponse(id: number, data: any): Observable<Bajaj>{
    return this._http.patch<Bajaj>(this.url + '/bajaj/' + id, data)
  }

  updateBajajCallBack(id: number, data: any): Observable<Bajaj>{
    return this._http.patch<Bajaj>(this.url + '/bajaj/callback/' + id, data)
  }

  addBajajFollowUp(data: any){
    return this._http.post(this.url + '/bajajfollowUp', data)
  }

  getBajajFollowUpCaller():Observable<BajajFollowup[]>{
    return this._http.get<BajajFollowup[]>(this.url + '/bajajfollowUp/caller')
  }

  getBajajFollowUpById(id: number):Observable<BajajFollowup>{
    return this._http.get<BajajFollowup>(this.url + '/bajajfollowUp/' + id)
  }

  updateBajajFollowupCallBack(id: number, data: any): Observable<BajajFollowup>{
    return this._http.patch<BajajFollowup>(this.url + '/bajajfollowup/callback/' + id, data)
  }

  updateBajajFollowupResponse(id: number, data: any): Observable<BajajFollowup>{
    return this._http.patch<BajajFollowup>(this.url + '/bajajfolllowup/' + id, data)
  }

  // ASIANET

  getAsianetCaller(): Observable<Asianet[]>{
    return this._http.get<Asianet[]>(this.url + '/asianet/caller');
  }

  getAsianetById(id: number): Observable<Asianet>{
    return this._http.get<Asianet>(this.url + '/asianet/' +id);
  }

  updateAsianetResponse(id: number, data: any): Observable<Asianet>{
    return this._http.patch<Asianet>(this.url + '/asianet/' + id, data)
  }

  updateAsianetCallBack(id: number, data: any): Observable<Asianet>{
    return this._http.patch<Asianet>(this.url + '/asianet/callback/' + id, data)
  }

  addAsianetFollowUp(data: any){
    return this._http.post(this.url + '/asianetfollowUp', data)
  }

  getAsianetFollowCaller(): Observable<AsianetFollowup[]>{
    return this._http.get<AsianetFollowup[]>(this.url + '/asianetfollowUp/caller');
  }

  getAsianetFollowUpById(id: number):Observable<AsianetFollowup>{
    return this._http.get<AsianetFollowup>(this.url + '/asianetfollowUp/' + id)
  }

  updateAsianetFollowupResponse(id: number, data: any): Observable<AsianetFollowup>{
    return this._http.patch<AsianetFollowup>(this.url + '/asianetfollowup/' + id, data)
  }

  updateAsianetFollowupCallBack(id: number, data: any): Observable<AsianetFollowup>{
    return this._http.patch<AsianetFollowup>(this.url + '/asianetfollowup/callback/' + id, data)
  }

  // ASIANET SALES
  getAsianetSalesCaller(): Observable<AsianetSalesBase[]>{
    return this._http.get<AsianetSalesBase[]>(this.url + '/asianetsales/caller');
  }

  getAsianetSalesById(id: number): Observable<Asianet>{
    return this._http.get<Asianet>(this.url + '/asianetsales/' +id);
  }

  updateAsianetSalesCallBack(id: number, data: any): Observable<Asianet>{
    return this._http.patch<Asianet>(this.url + '/asianetsales/callback/' + id, data)
  }

  updateAsianetSalesResponse(id: number, data: any): Observable<Asianet>{
    return this._http.patch<Asianet>(this.url + '/asianetsales/' + id, data)
  }

  addAsianetSalesFollowUp(data: any){
    return this._http.post<Asianet>(this.url + '/asianetsalesfollow', data)
  }

  getAsianetSalesFollowUpCaller():Observable<AsianetSaleFollowup[]>{
    return this._http.get<AsianetSaleFollowup[]>(this.url + '/asianetsalesfollow/caller')
  }

  getAsianetSalesFollowUpById(id: number):Observable<AsianetSaleFollowup>{
    return this._http.get<AsianetSaleFollowup>(this.url + '/asianetsalesfollow/' + id)
  }

  updateAsianetSalesFollowupResponse(id: number, data: any): Observable<AsianetFollowup>{
    return this._http.patch<AsianetFollowup>(this.url + '/asianetsalesfollow/' + id, data)
  }

  updateAsianetSalesFollowupCallBack(id: number, data: any): Observable<AsianetFollowup>{
    return this._http.patch<AsianetFollowup>(this.url + '/asianetsalesfollow/callback/' + id, data)
  }

  // VI

  getViCaller(): Observable<Vi[]>{
    return this._http.get<Vi[]>(this.url + '/vi/caller');
  }

  getViById(id: number): Observable<Vi>{
    return this._http.get<Vi>(this.url + '/vi/' +id);
  }

  updateViResponse(id: number, data: any): Observable<Vi>{
    return this._http.patch<Vi>(this.url + '/vi/' + id, data)
  }

  updateViCallBack(id: number, data: any): Observable<Vi>{
    return this._http.patch<Vi>(this.url + '/vi/callback/' + id, data)
  }

  addViFollowUp(data: any){
    return this._http.post(this.url + '/vifollowUp', data)
  }

  getViFollowUpCaller():Observable<ViFollowup[]>{
    return this._http.get<ViFollowup[]>(this.url + '/vifollowUp/caller')
  }

  getViFollowUpById(id: number):Observable<ViFollowup>{
    return this._http.get<ViFollowup>(this.url + '/vifollowUp/' + id)
  }

  updateViFollowupResponse(id: number, data: any): Observable<ViFollowup>{
    return this._http.patch<ViFollowup>(this.url + '/vifollowup/' + id, data)
  }

  updateViFollowupCallBack(id: number, data: any): Observable<ViFollowup>{
    return this._http.patch<ViFollowup>(this.url + '/vifollowup/callback/' + id, data)
  }

  // VICOLLECTIONS
  getViCollectionsCaller(): Observable<ViCollection[]>{
    return this._http.get<ViCollection[]>(this.url + '/vicollections/caller');
  }

  getViCollectionsById(id: number): Observable<ViCollection>{
    return this._http.get<ViCollection>(this.url + '/vicollections/' +id);
  }

  updateViCollectionsResponse(id: number, data: any): Observable<ViCollection>{
    return this._http.patch<ViCollection>(this.url + '/vicollections/' + id, data)
  }

  updateViCollectionsCallBack(id: number, data: any): Observable<ViCollection>{
    return this._http.patch<ViCollection>(this.url + '/vicollections/callback/' + id, data)
  }

  addViCollectionFollowUp(data: any){
    return this._http.post<ViCollection>(this.url + '/vicollectionsfollow', data)
  }

  getViCollectionFollowUpCaller():Observable<ViCollectionFollowup[]>{
    return this._http.get<ViCollectionFollowup[]>(this.url + '/vicollectionsfollow/caller')
  }

  getViCollectionFollowUpById(id: number):Observable<ViCollectionFollowup>{
    return this._http.get<ViCollectionFollowup>(this.url + '/vicollectionsfollow/' + id)
  }

  updateViCollectionFollowupResponse(id: number, data: any): Observable<ViCollectionFollowup>{
    return this._http.patch<ViCollectionFollowup>(this.url + '/vicollectionsfollow/' + id, data)
  }

  updateViCollectionFollowupCallBack(id: number, data: any): Observable<ViCollectionFollowup>{
    return this._http.patch<ViCollectionFollowup>(this.url + '/vicollectionsfollow/callback/' + id, data)
  }

}
