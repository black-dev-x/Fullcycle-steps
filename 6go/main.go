package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Product struct {
	ID   string `json: id`
	Name string `json: name`
}

func (p Product) Vender(price float64) {
	fmt.Println("Vendido", p.Name, "por", price)
}

func getProduct(res http.ResponseWriter, req *http.Request) {
	product := Product{
		ID:   "1",
		Name: "Batata",
	}
	json.NewEncoder(res).Encode(product)
	res.Write([]byte("Hello, World!"))

}

func contador(v int) {
	list := make([]int, v)
	for i := range list {
		fmt.Println(i)
	}
}

func publish(ch chan int) {
	list := make([]int, 1000)
	for i := range list {
		ch <- i
	}
	close(ch)
}

func consumer(ch chan int) {
	for x := range ch {
		time.Sleep(time.Second)
		fmt.Printf("Consumindo %d\n", x)
	}
}

// numero = 1
func main() {
	canal := make(chan int)
	go publish(canal)
	go consumer(canal)
	go consumer(canal)
	go consumer(canal)
	go consumer(canal)
	consumer(canal)
	// go func() {
	// 	msg := <-canal               // 1 para aqui
	// 	fmt.Println(msg)             // 3
	// 	canal <- "recebi a mensagem" // 4
	// }()

	// go func() {
	// 	canal <- "Estou enviando uma mensagem" // 2
	// 	fmt.Println(<-canal)                   // 5
	// }()

	// http.ListenAndServe(":8000", nil)
	// http.HandleFunc("/hello", getProduct)
}
