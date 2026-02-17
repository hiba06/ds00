import asyncio, websockets, json, csv, time

async def connect():
    url = "wss://ws-feed.exchange.coinbase.com"

    async with websockets.connect(url) as ws:

        subscribe_message = {
            "type": "subscribe",
            "product_ids": ["BTC-USD","ETH-USD","SOL-USD"],
            "channels": ["ticker"]
        }

        await ws.send(json.dumps(subscribe_message))
        print("Collecting real-time data for 30 minutes...\n")

        start_time = time.time()

        with open("crypto_realtime_data.csv","w",newline="") as file:
            writer = csv.writer(file)
            writer.writerow([
                "Time","Coin","Price","Best_Bid","Best_Ask","Last_Size","Side"
            ])

            while True:
                if time.time() - start_time > 1800:   # 30 minutes
                    break

                message = await ws.recv()
                data = json.loads(message)

                if data["type"] == "ticker":
                    writer.writerow([
                        data["time"],
                        data["product_id"],
                        data["price"],
                        data["best_bid"],
                        data["best_ask"],
                        data["last_size"],
                        data["side"]
                    ])
                    file.flush()

asyncio.run(connect())

