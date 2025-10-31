"use client"

import React from 'react'
import { Ticket } from 'lucide-react'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Menu } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { useState, useEffect  } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { toast } from "sonner";



export default function homepage() {
    const router = useRouter();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [ticketToDelete, setTicketToDelete] = useState(null);
// ...
    const [tickets, setTickets] = useState([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
        const saved = localStorage.getItem("tickets");
        if (saved) {
            setTickets(JSON.parse(saved));
        }
    }, []); 

    useEffect(() => {
        if (isClient) {
            localStorage.setItem("tickets", JSON.stringify(tickets));
        }
    }, [tickets, isClient]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [formData, setFormData] = useState({ id: null, title: "", description: "", status: "Open", createdAt: new Date().toISOString() });


   const openDialog = (ticket = null) => {
    if (ticket) {
      setFormData({
        id: ticket.id,
        title: ticket.title ?? "",
        description: ticket.description ?? "",
        status: ticket.status ?? "Open",
        createdAt: ticket.createdAt,
      });
    } else {
      setFormData({ id: Date.now(), title: "", description: "", status: "Open", createdAt: new Date().toISOString() });
    }
    setDialogOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const isEditing = tickets.some(t => t.id === formData.id);

    if (isEditing) {
          const updatedTickets = tickets.map((t) => 
          
              (t.id === formData.id ? { ...t, ...formData } : t)
          );
          setTickets(updatedTickets);
      } else {
          setTickets((prev) => [
              ...prev,
              formData, 
          ]);
      }
      
      setDialogOpen(false);
  };

const handleDelete = (id) => {
  console.log("Delete requested for id:", id);
  setTicketToDelete(id);
  setDeleteDialogOpen(true);
};

const confirmDelete = () => {
  if (ticketToDelete !== null) {
    console.log("Confirm delete for id:", ticketToDelete);
    setTickets((prev) => prev.filter((t) => t.id !== ticketToDelete));
    setTicketToDelete(null);
    setDeleteDialogOpen(false);
    try {
      toast.success("Ticket Deleted", {
        description: "The ticket has been successfully removed.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Toast notification failed to display:", error);
    }
  } else {
    setDeleteDialogOpen(false);
  }
};


   const formatDate = (isoString) => {
  const date = new Date(isoString);
  return isNaN(date.getTime()) ? 'Unknown date' : date.toLocaleString();
};

  const STATUS_OPTIONS = [
      { value: 'Open', label: 'Open' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'Sold Out', label: 'Sold Out' },
  ];

  const navigateToDashboard = () => router.push('/dashboard');
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-600 to-blue-600 w-full mx-auto pt-6 text-white overflow-hidden">
        <nav>
            <Button 
                    className=" bg-indigo-500 px-4 mx-4 text-white font-semibold flex items-center gap-2 hover:scale-105 hover:bg-indigo-600 cursor-pointer transition duration-300"
                    onClick={navigateToDashboard}
                >
                    <Menu />
                </Button>
            
        </nav>
        <main>

            <div className='mx-auto text-center gap-5'>
                <Ticket className="w-12 h-12 text-white mx-auto mb-4" />
                <h1 className="text-4xl text-center font-extrabold mb-4">TIXIFY Ticket Management</h1> 
            </div>
            
            

        </main>

        <div className="flex-grow p-6">
          {isClient && (
            tickets.length === 0 ? (
                <Card className="bg-gray-200 text-black max-w-md mx-auto text-center">
                <CardHeader>
                    <CardTitle>Create Ticket</CardTitle>
                    <CardDescription>Fill in the details to create a new ticket</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button 
                    className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-gray-800 font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-300"
                    onClick={openDialog}>Create Ticket</Button>
                </CardContent>
                <CardFooter>
                </CardFooter>
                </Card>
            ) : (
              <div>
                <div className="flex justify-end mb-4 px-10">
                  <Button 
                  className="bg-yellow-400 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-300"
                  onClick={() => openDialog()}>+ Create New Ticket</Button>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {tickets.map((ticket, index) => (
                    <Card className={"bg-gray-200 text-black"} key={ticket.id ?? index}>
                    <CardHeader>
                        <CardTitle>{ticket.title}</CardTitle>
                        <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap 
                            ${ticket.status === 'Open' ? 'bg-green-100 text-green-800' :
                              ticket.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                              ticket.status === 'Sold Out' ? 'bg-gray-100 text-gray-800' :
                              'bg-gray-100 text-gray-800' 
                            }`}
                        >
                            {ticket.status}
                        </span>
                        <CardDescription>{ticket.description}</CardDescription>
                        <p className="text-xs text-gray-500 mt-1">
                            Created at: {formatDate(ticket.createdAt)}
                        </p>
                        
                    </CardHeader>
                     <CardFooter className="flex justify-end space-x-2">
                        <Button 
                        className="bg-white cursor-pointer font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-300"
                        size="sm" 
                        onClick={() => openDialog(ticket)}>Edit</Button>
                        
                        <Button
                        className="bg-red-500 cursor-pointer font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition duration-300"
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(ticket.id)}
                        >
                        Delete
                        </Button>
                    </CardFooter>
                    </Card>
                ))}
                </div>
                </div>
            )
        )}

            

            <Dialog 
            open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-gray-300 text-black border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle>Create Ticket</DialogTitle>
                    <DialogDescription>Fill in the details to create a new ticket</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className='space-y-2'>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter ticket title"
                    />
                    </div>
                    <div className='space-y-2'>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Enter ticket description"
                    />
                    </div>
                    <DialogFooter className="flex justify-end space-x-2">
                    <DialogClose asChild>
                        <Button 
                        className="bg-white cursor-pointer"
                        type="button" variant="outline">
                        Cancel
                        </Button>
                    </DialogClose>

                    <Button 
                    className="bg-yellow-400 cursor-pointer font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-300"
                    type="submit">Create</Button>
                    </DialogFooter>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Status</label>
                      <div className="flex space-x-4">
                          {STATUS_OPTIONS.map((option) => (
                              <div key={option.value} className="flex items-center">
                                  <input
                                      id={`status-${option.value}`}
                                      name="status"
                                      type="radio"
                                      value={option.value}
                                      checked={formData.status === option.value} 
                                      onChange={handleChange} 
                                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                  />
                                  <label 
                                      htmlFor={`status-${option.value}`} 
                                      className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer"
                                  >
                                      {option.label}
                                  </label>
                              </div>
                          ))}
                      </div>
                  </div>
                </form>
                </DialogContent>
            </Dialog>
        </div>
        {/* DELETE CONFIRMATION DIALOG */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent className={"bg-gray-200 text-black"}>
                  <DialogHeader>
                      <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
                      <DialogDescription>
                          Are you sure you want to delete this ticket? This action cannot be undone.
                      </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end space-x-2">
                      <Button className="bg-white cursor-pointer"
                          variant="outline" 
                          onClick={() => setDeleteDialogOpen(false)}>
                          Cancel
                      </Button>
                      <Button 
                      className="bg-red-500 cursor-pointer"
                          variant="destructive" 
                          onClick={confirmDelete}>
                          Delete
                      </Button>
                  </DialogFooter>
              </DialogContent>
          </Dialog>

        
        <footer className="flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-200 text-black w-full px-8 py-6 mt-8 text-center">
            <p className="flex items-center gap-2 text-2xl font-extrabold">
                <Ticket className="w-6 h-6 text-blue-500" />
                TIXIFY
            </p>

            
            <p className="text-gray-600 text-sm">
                © 2024 <span className="font-semibold">TIXIFY</span>. All rights reserved.
            </p>

            
            <div className="flex gap-4 text-gray-500">
                <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
                <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-500 transition-colors" />
                <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-700 transition-colors" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-sky-500 transition-colors" />
            </div>
        </footer>

    </div>
  )
}
