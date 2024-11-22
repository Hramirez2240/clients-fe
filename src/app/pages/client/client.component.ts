import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client/client.model';
import { ClientService } from 'src/app/shared/services/client.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  isModalVisible = false;
  isLoading = false;
  validateForm: FormGroup = this._formBuilder.group({});

  constructor(
    private readonly _clientService: ClientService,
    private readonly _modal: NzModalService,
    private readonly _message: NzMessageService,
    private readonly _formBuilder: NonNullableFormBuilder
  )
  {}

  ngOnInit(): void {
    this.getClientsList();
    this.validateForm = this._formBuilder.group({
      userName: this._formBuilder.control('', [Validators.required]),
      firstName: this._formBuilder.control('', [Validators.required]),
      lastName: this._formBuilder.control('', [Validators.required]),
      email: this._formBuilder.control('', [Validators.required, Validators.email]),
      phoneNumber: this._formBuilder.control('', [Validators.required])
    });
  };

  getClientsList(): void{
    this._clientService.get().subscribe((response) => {
      this.clients = response.data;
    })
  };

  deleteClient(id: string): void{
    this._clientService.delete(id).subscribe(() => {
      this._message.success('Cliente eliminado correctamente');
      this.getClientsList();
    })
  };

  createClient(request: Client){
    this.isLoading = true;
    this._clientService.post(request).subscribe(() => {
      this.isLoading = false;
      this.isModalVisible = false;
      this.validateForm.reset();
      this._message.success('Cliente creado correctamente');
      this.getClientsList();
    })
  }

  showDeleteConfirm(id: string, userName: string): void{
    this._modal.confirm({
      nzTitle: '¿Seguro que quieres eliminar este cliente?',
      nzContent: '<b style="color: red;">' + userName + '</b>',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteClient(id),
      nzCancelText: 'No',
      nzOnCancel: () => {}
    })
  };

  showModal(){
    this.isModalVisible = true;
  };

  handleCancel(){
    this.isModalVisible = false;
  };
}
