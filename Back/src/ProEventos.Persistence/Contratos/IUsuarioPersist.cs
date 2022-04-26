using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IUsuarioPersist
    {
        Task<Usuario> GetUsuarioByEmailESenha(string email, string senha);
        Task<Usuario> GetUsuarioById(int usuarioId);
    }
}