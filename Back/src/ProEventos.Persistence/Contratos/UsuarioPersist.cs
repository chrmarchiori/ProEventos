using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;

namespace ProEventos.Persistence.Contratos
{
    public class UsuarioPersist : IUsuarioPersist
    {

        private readonly ProEventosContext _context;
        public UsuarioPersist(ProEventosContext context)
        {
            _context = context;
        }

        public async Task<Usuario> GetUsuarioByEmailESenha(string email, string senha)
        {
            IQueryable<Usuario> query = _context.Usuarios;
            
            query = query.Where(u => u.Email == email).Where(u => u.Senha == senha);

            return await query.FirstAsync(); 
        }

        public async Task<Usuario> GetUsuarioById(int usuarioId)
        {
            IQueryable<Usuario> query = _context.Usuarios;
            
            query = query.Where(u => u.Id == usuarioId);

            return await query.FirstAsync(); 
        }
    }
}