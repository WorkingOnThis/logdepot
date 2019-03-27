import { NgModule } from "@angular/core";

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from "./pages.component";
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { DataTablesModule } from '../../../node_modules/angular-datatables';

import { ColorPickerModule } from 'ngx-color-picker';

import { AgregarUsuarioComponent } from './usuarios/agregar-usuario/agregar-usuario.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { ActualizarUsuarioComponent } from './usuarios/actualizar-usuario/actualizar-usuario.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { AgregarEmpresaComponent } from './empresas/agregar-empresa/agregar-empresa.component';
import { ActualizarEmpresaComponent } from './empresas/actualizar-empresa/actualizar-empresa.component';
import { ListarEmpresasComponent } from './empresas/listar-empresas/listar-empresas.component';
import { ModalGenericoComponent } from '../components/modal-generico/modal-generico.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { DepositoComponent } from './deposito/deposito.component';
import { ConfigurarDepositoComponent } from './deposito/configurar-deposito/configurar-deposito.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { ModalDepositoComponent } from '../components/modal-deposito/modal-deposito.component';
import { CajasComponent } from './cajas/cajas.component';
import { ListarCajasComponent } from './cajas/listar-cajas/listar-cajas.component';
import { AgregarCajasComponent } from './cajas/agregar-cajas/agregar-cajas.component';
import { ActualizarCajasComponent } from './cajas/actualizar-cajas/actualizar-cajas.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ListarDocumentosComponent } from './documentos/listar-documentos/listar-documentos.component';
import { AgregarDocumentosComponent } from './documentos/agregar-documentos/agregar-documentos.component';
import { ActualizarDocumentosComponent } from './documentos/actualizar-documentos/actualizar-documentos.component';
import { TiposCajaComponent } from './tipos-caja/tipos-caja.component';
import { EstadosComponent } from './estados/estados.component';

import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { EtiquetasCajaComponent } from './etiqueta/etiquetas-caja/etiquetas-caja.component';
import { EtiquetasDocumentoComponent } from './etiqueta/etiquetas-documento/etiquetas-documento.component';
import { EtiquetasListadoComponent } from './etiqueta/etiquetas-listado/etiquetas-listado.component';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxBarcodeModule } from 'ngx-barcode';

import { MatCheckboxModule } from '@angular/material/checkbox'

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        AccountSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        AgregarUsuarioComponent,
        ListarUsuariosComponent,
        ActualizarUsuarioComponent,
        EmpresasComponent,
        AgregarEmpresaComponent,
        ActualizarEmpresaComponent,
        ListarEmpresasComponent,
        ModalGenericoComponent,
        SeccionesComponent,
        DepositoComponent,
        ConfigurarDepositoComponent,
        ModalDepositoComponent,
        CajasComponent,
        ListarCajasComponent,
        AgregarCajasComponent,
        ActualizarCajasComponent,
        DocumentosComponent,
        ListarDocumentosComponent,
        AgregarDocumentosComponent,
        ActualizarDocumentosComponent,
        TiposCajaComponent,
        EstadosComponent,
        EtiquetaComponent,
        EtiquetasCajaComponent,
        EtiquetasDocumentoComponent,
        EtiquetasListadoComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        PAGES_ROUTES,
        PipesModule,
        DataTablesModule,
        ColorPickerModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn'
        }),
        NgxQRCodeModule,
        NgxBarcodeModule,
        MatCheckboxModule
    ]
})
export class PagesModule { }
