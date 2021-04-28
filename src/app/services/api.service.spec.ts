import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let http: jasmine.SpyObj<HttpClient>;
  const name = 'characters';

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    http = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
  });

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('get should call get method from HttpClient', () => {
    const service: ApiService = TestBed.get(ApiService);
    http.get.and.returnValue(of({}));

    service.get(name).subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('post should call post method from HttpClient', () => {
    const service: ApiService = TestBed.get(ApiService);
    http.post.and.returnValue(of({}));

    service.post(name, {}).subscribe(() => {
      expect(http.post).toHaveBeenCalled();
    });
  });

  it('put should call put method from HttpClient', () => {
    const service: ApiService = TestBed.get(ApiService);
    http.put.and.returnValue(of({}));

    service.put(name, {}).subscribe(() => {
      expect(http.put).toHaveBeenCalled();
    });
  });

  it('\*delete should call delete method from HttpClient', () => {
    const service: ApiService = TestBed.get(ApiService);
    http.delete.and.returnValue(of({}));

    service.delete(name).subscribe(() => {
      expect(http.delete).toHaveBeenCalled();
    });
  });
});
