// app/api/todo/route.ts

import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    //fetch todos from the db
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    // respond with the todos
    return NextResponse.json(todos, { status: 200 })
  } catch (error) {
    console.log("[GET TODO]", error)

    // Handle errors
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(req) {
  try {
    // detsrtucture todoTitle from the incoming request
    const { todoTitle } = await req.json()

    if (!todoTitle) {
      return new NextResponse("Title required", { status: 400 })
    }

    // Create and save todo on the database
    const todo = await prisma.todo.create({
      data: {
        title: todoTitle,
      },
    })

    return NextResponse.json(todo, { status: 200 }) // Respond with the created todo
  } catch (error) {
    console.log("[POST TODO]", error)
    return new NextResponse("Internal Server Error", { status: 500 }) // Handle errors
  }
}
