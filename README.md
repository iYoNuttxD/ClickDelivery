# 📝 ENTREGA - Arquitetura de Microserviços

---

## 👥 Equipe

- Daniel Ganz Musse
- Enrico Malho Bozza
- Flavio Augusto da Cruz Melo
- João Vitor de Souza Hernandes
- Matheus Lowen

---

## 🔗 Repositórios GitHub

- **BFF Service:** https://github.com/iYoNuttxD/bff-service
- **Delivery Service:** https://github.com/iYoNuttxD/delivery-service-microservice
- **Orders Service:** https://github.com/iYoNuttxD/orders-service-microservice
- **MicroFrontEnd:** https://github.com/iYoNuttxD/microfrontend-erp
- **Azure Functions:** https://github.com/iYoNuttxD/azure-functions-v4

---

## 🐳 Docker Hub

- **BFF Service:** https://hub.docker.com/r/iyonuttxd/bff-service
- **Delivery Service:** https://hub.docker.com/r/iyonuttxd/delivery-service
- **Orders Service:** https://hub.docker.com/r/iyonuttxd/orders-service

<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/e9ba40e7-89c8-43bb-8f93-2941cdef0bfb" />

---

## ⚡ Azure Functions

- **CreateEvent:** POST https://erp-events-functions.azurewebsites.net/api/CreateEvent

### **JSON utilizado para teste**
```json
{
  "type": "pedido_criado",
  "data": {
    "pedidoId": "12345",
    "cliente": "Daniel",
    "valor": 89.90,
    "endereco": "Rua XV de Novembro, 123 - Curitiba",
    "pagamento": "cartao_credito",
    "status": "pendente"
  }
}
```

<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/f6ea1713-bb7b-49f2-bad2-ff57545b44f0" />

- **GetData:** GET https://erp-events-functions.azurewebsites.net/api/GetData/{id}

<img width="1917" height="871" alt="image" src="https://github.com/user-attachments/assets/170769e1-6e75-449b-b31e-fc7f0c7544bf" />

---

## 🗄️ Azure SQL Server

- **Server:** erp-delivery-sql-server.database.windows.net
- **Database:** DeliveryServiceDB

<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/b918f0f2-b721-4c7f-a212-f85a5aed8a59" />

---

## 🍃 MongoDB Atlas

- **Connection String:** mongodb+srv://ordersadmin:<password>@orders-cluster.cxzyl8z.mongodb.net/?appName=orders-cluster
- **Cluster:** orders-cluster

<img width="1919" height="871" alt="image" src="https://github.com/user-attachments/assets/6c3afb71-f921-4391-b09c-dcf50c86cca7" />

---


**Outubro/2025**


