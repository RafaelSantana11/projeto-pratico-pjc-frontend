export default {
  treatError(error) {
    if (error.response) {
      if (error.response.status === 404)
        return "A rota requisitada não foi encontrada";
      if (error.response.status === 500) return "Erro inesperado.";

      return error.response.data;
    } else if (error.request) {
      return error.request;
    } else {
      return error;
    }
  },
};
