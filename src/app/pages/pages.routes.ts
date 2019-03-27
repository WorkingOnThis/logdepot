import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { AdminGuard } from '../services/service.index';
//Usuarios
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AgregarUsuarioComponent } from './usuarios/agregar-usuario/agregar-usuario.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { ActualizarUsuarioComponent } from './usuarios/actualizar-usuario/actualizar-usuario.component';
//Empresas
import { EmpresasComponent } from './empresas/empresas.component';
import { AgregarEmpresaComponent } from './empresas/agregar-empresa/agregar-empresa.component';
import { ActualizarEmpresaComponent } from './empresas/actualizar-empresa/actualizar-empresa.component';
import { ListarEmpresasComponent } from './empresas/listar-empresas/listar-empresas.component';
//Cajas
import { CajasComponent } from './cajas/cajas.component';
import { AgregarCajasComponent } from './cajas/agregar-cajas/agregar-cajas.component';
import { ActualizarCajasComponent } from './cajas/actualizar-cajas/actualizar-cajas.component';
import { ListarCajasComponent } from './cajas/listar-cajas/listar-cajas.component';
//Secciones
import { SeccionesComponent } from './secciones/secciones.component';
//Deposito
import { DepositoComponent } from './deposito/deposito.component';
import { ConfigurarDepositoComponent } from './deposito/configurar-deposito/configurar-deposito.component';
//Documentos
import { DocumentosComponent } from './documentos/documentos.component';
import { AgregarDocumentosComponent } from './documentos/agregar-documentos/agregar-documentos.component';
import { ActualizarDocumentosComponent } from './documentos/actualizar-documentos/actualizar-documentos.component';
import { ListarDocumentosComponent } from './documentos/listar-documentos/listar-documentos.component';
//Tipos de caja
import { TiposCajaComponent } from './tipos-caja/tipos-caja.component';
//Estados
import { EstadosComponent } from './estados/estados.component';

//Etiquetas
import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { EtiquetasCajaComponent } from './etiqueta/etiquetas-caja/etiquetas-caja.component';
import { EtiquetasListadoComponent } from './etiqueta/etiquetas-listado/etiquetas-listado.component';
import { EtiquetasDocumentoComponent } from './etiqueta/etiquetas-documento/etiquetas-documento.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            //Todos
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Inicio' } },
            //Generico
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Preferencias' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil del usuario' } },
            //Secciones
            { path: 'areas', component: SeccionesComponent, data: { titulo: 'Areas y tipos' } },
            //Mantenimiento
            //Usuarios
            { path: 'usuarios', component: UsuariosComponent, canActivate:[ AdminGuard ],
                children: [
                             { path: '', redirectTo: 'listar-usuarios', pathMatch: 'full'},
                             { path: 'agregar-usuario', component: AgregarUsuarioComponent, data: { titulo: 'Agregar usuario' } },
                             { path: 'actualizar-usuario/:id', component: ActualizarUsuarioComponent, data: { titulo: 'Actualizar usuario' } },
                             { path: 'listar-usuarios', component: ListarUsuariosComponent, data: { titulo: 'Listar usuarios' } }
                           ],
                data: { titulo: 'Usuarios'}
            },
            //Empresas
            { path: 'empresas', component: EmpresasComponent, canActivate:[ AdminGuard ],
                children: [
                    { path: '', redirectTo: 'listar-empresas', pathMatch: 'full'},
                    { path: 'agregar-empresa', component: AgregarEmpresaComponent, data: { titulo: 'Agregar empresa' } },
                    { path: 'actualizar-empresa/:id', component: ActualizarEmpresaComponent, data: { titulo: 'Actualizar empresa' } },
                    { path: 'listar-empresas', component: ListarEmpresasComponent, data: { titulo: 'Listar empresas' } }
                          ],
               data: { titulo: 'Empresas'}
            },
            //Cajas
            { path: 'cajas', component: CajasComponent, canActivate:[ AdminGuard ],
            children: [
                { path: '', redirectTo: 'listar-cajas', pathMatch: 'full'},
                { path: 'agregar-caja', component: AgregarCajasComponent, data: { titulo: 'Agregar caja' } },
                { path: 'actualizar-caja/:id', component: ActualizarCajasComponent, data: { titulo: 'Actualizar caja' } },
                { path: 'listar-cajas', component: ListarCajasComponent, data: { titulo: 'Listar cajas' } }
                      ],
               data: { titulo: 'Cajas'}
            },
            //Documentos
            { path: 'documentos', component: DocumentosComponent, canActivate:[ AdminGuard ],
            children: [
                { path: '', redirectTo: 'listar-documentos', pathMatch: 'full'},
                { path: 'agregar-documento/:id', component: AgregarDocumentosComponent, data: { titulo: 'Agregar documento' } },
                { path: 'actualizar-documento/:id', component: ActualizarDocumentosComponent, data: { titulo: 'Actualizar documento' } },
                { path: 'listar-documentos', component: ListarDocumentosComponent, data: { titulo: 'Listar documentos' } }
                      ],
               data: { titulo: 'Documentos'}
            },
            // Deposito
            { path: 'deposito', component: DepositoComponent, canActivate:[ AdminGuard ],
                children: [
                    { path: '', redirectTo: 'configurar-deposito', pathMatch: 'full'},
                    { path: 'configurar-deposito', component: ConfigurarDepositoComponent, data: { titulo: 'Configurar deposito' } }
                          ],
               data: { titulo: 'Ubicaciones'}
            },
            //Etiquetas
            { path: 'etiquetas', component: EtiquetaComponent, canActivate:[ AdminGuard ],
                children: [
                    { path: '', redirectTo: 'listar-etiquetas', pathMatch: 'full'},
                    { path: 'etiquetas-cajas', component: EtiquetasCajaComponent, data: { titulo: 'Etiquetas para cajas' } },
                    { path: 'etiquetas-documentos', component: EtiquetasDocumentoComponent, data: { titulo: 'Etiquetas para documentos' } },
                    { path: 'listar-etiquetas', component: EtiquetasListadoComponent, data: { titulo: 'Listar etiquetas' } }
                      ],
               data: { titulo: 'Etiquetas'}
            },
            // Tipos de caja
            { path: 'tipos-de-caja', component: TiposCajaComponent, data: { titulo: 'Tipos de caja' } },
            //Estados
            { path: 'estados', component: EstadosComponent, data: { titulo: 'Estados' } },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
