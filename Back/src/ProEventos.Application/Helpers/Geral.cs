namespace ProEventos.Application.Helpers
{
    public class Geral
    {
        public static string Encode64(string str) 
        {
            
            byte[] toEncodeAsBytes = System.Text.ASCIIEncoding.ASCII.GetBytes(str);

            string returnValue = System.Convert.ToBase64String(toEncodeAsBytes);

            return returnValue;
        }

        public static string Decode64(string str)
        {
            byte[] encodedDataAsBytes = System.Convert.FromBase64String(str);

            string returnValue = System.Text.ASCIIEncoding.ASCII.GetString(encodedDataAsBytes);

            return returnValue;
        }
    }
}