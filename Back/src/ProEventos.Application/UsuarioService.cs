using System;
using System.Threading.Tasks;
using ProEventos.Application.Contratos;
using ProEventos.Application.Helpers;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IUsuarioPersist _usuarioPersist;
        
        public UsuarioService(IGeralPersist geralPersist, 
                             IUsuarioPersist usuarioPersist)
        {
            this._usuarioPersist = usuarioPersist;
            this._geralPersist = geralPersist;
        }

        public async Task<Usuario> AddUsuarios(Usuario model)
        {
            try
            {
                _geralPersist.Add<Usuario>(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    var usuarioRetorno = await _usuarioPersist.GetUsuarioById(model.Id);
                    return usuarioRetorno;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Usuario> UpdateUsuario(int usuarioId, Usuario model)
        {
            try
            {
                var usuario = await _usuarioPersist.GetUsuarioById(usuarioId);
                if (usuario == null) return null;

                model.Id = usuario.Id;

                _geralPersist.Update<Usuario>(usuario);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var usuarioRetorno = await _usuarioPersist.GetUsuarioById(usuario.Id);
                    return usuarioRetorno;
                }
                return null;
            }
            catch (Exception ex)
            {                
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteUsuario(int usuarioId)
        {
            try
            {
                var usuario = await _usuarioPersist.GetUsuarioById(usuarioId);
                if (usuario == null) throw new Exception("Usuário para delete não encontrado");

                _geralPersist.Delete<Usuario>(usuario);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Usuario> GetUsuarioByEmailSenha(Usuario model)
        {
            try
            {
                var usuario = await _usuarioPersist.GetUsuarioByEmailESenha(model.Email, model.Senha);
                if (usuario == null) return null;

                return usuario;
            }
            catch (Exception ex)
            {                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Usuario> GetUsuarioById(int usuarioId)
        {
            try
            {
                var usuario = await _usuarioPersist.GetUsuarioById(usuarioId);
                if (usuario == null) return null;

                return usuario;
            }
            catch (Exception ex)
            {                
                throw new Exception(ex.Message);
            }
        }

        
    }
}