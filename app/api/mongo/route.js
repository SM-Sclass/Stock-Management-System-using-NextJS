import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server';

export async function GET(request) {
  const uri = "mongodb+srv://Asus:$UM!T376@cluster0.vvhlsc0.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    const database = client.db('StockMS');
    const table = database.collection('inventory');

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const allproduct = await table.find(query).toArray();

    console.log(allproduct);
    return NextResponse.json({ allproduct })
  } finally {

    await client.close();
  }
}
