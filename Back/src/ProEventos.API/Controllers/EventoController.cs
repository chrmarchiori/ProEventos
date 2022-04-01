using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> __evento = new Evento[]{
            new Evento(){
                EventoId = 1,
                Tema = "Angular e .net",
                Local = "Seila",
                Lote = "Primeiro Lote",
                QtdPessoas = 250,
                DataEvento = DateTime.Now.AddDays(2).ToString(),
                ImagemURL = "foto.png"
            },
            new Evento(){
                EventoId = 2,
                Tema = "teste2",
                Local = "Seila",
                Lote = "Segundo Lote",
                QtdPessoas = 100,
                DataEvento = DateTime.Now.AddDays(5).ToString(),
                ImagemURL = "foto2.png"
            }    
        };        
        public EventoController()
        {
           
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return __evento;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        {
            return __evento.Where(evento => evento.EventoId == id);
        }

        [HttpPost]
        public string Post()
        {
            return "Hello World Post!";
        }

        [HttpPut("{id}")]
        public string Put(int id)
        {
            return $"Exemplo de put com id = {id}";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"Exemplo de delete com id = {id}";
        }
    }
}
