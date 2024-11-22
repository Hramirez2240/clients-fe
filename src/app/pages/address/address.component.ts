import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Address } from 'src/app/shared/models/address/address.model';
import { AddressService } from 'src/app/shared/services/address.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClientService } from 'src/app/shared/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  isLoading = false;
  isModalVisible = false;
  validateForm: FormGroup = this._formBuilder.group({});
  clientInformation: string = '';
  addresses: Address[] = [];
  clientId: string = '';

  constructor(
    private readonly _addressService: AddressService,
    private readonly _clientService: ClientService,
    private readonly _formBuilder: NonNullableFormBuilder,
    private readonly _modal: NzModalService,
    private readonly _message: NzMessageService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  )
  { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.clientId = params['id'];
      this.getAddressListById(this.clientId);
      this.getClientById(this.clientId);

      this.validateForm = this._formBuilder.group({
        country: this._formBuilder.control('', [Validators.required]),
        city: this._formBuilder.control('', [Validators.required]),
        street: this._formBuilder.control('', [Validators.required]),
        postalCode: this._formBuilder.control('', [Validators.required]),
        clientId: this._formBuilder.control(this.clientId, [Validators.required])
      });
    });
  }

  createAddress(request: Address){
    this.isLoading = true;
    this._addressService.post(request).subscribe(() => {
      this.isLoading = false;
      this.isModalVisible = false;
      this.validateForm.reset();
      this._message.success('Dirección agregada correctamente');
      this.getAddressListById(this.clientId);
    })
  }

  getAddressListById(clientId: string){
    this._addressService.getAddressByClientId(clientId).subscribe((response) => {
      this.addresses = response.data;
    });
  }

  deleteAddress(id: string){
    this._addressService.delete(id).subscribe(() => {
      this._message.success('Dirección eliminada correctamente');
      this.getAddressListById(this.clientId);
    })
  }

  showDeleteConfirm(id: string): void{
    this._modal.confirm({
      nzTitle: '¿Seguro que quieres eliminar esta dirección?',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteAddress(id),
      nzCancelText: 'No',
      nzOnCancel: () => {}
    })
  };

  getClientById(clientId: string){
    this._clientService.getById(clientId).subscribe((response) => {
      this.clientInformation = `${response.data.firstName} ${response.data.lastName}`
    })
  }

  showModal(){
    this.isModalVisible = true;
  };

  handleCancel(){
    this.isModalVisible = false;
  };

}
