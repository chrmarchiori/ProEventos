using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
    public interface IUsuarioService
    {
        Task<Usuario> AddUsuarios(Usuario model);
        Task<Usuario> UpdateUsuario(int usuarioId, Usuario model);
        Task<bool> DeleteUsuario(int usuarioId);

        Task<Usuario> GetUsuarioById(int usuarioId);
        Task<Usuario> GetUsuarioByEmailSenha(string email, string senha);
    }
}