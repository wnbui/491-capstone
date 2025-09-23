import { User, Plus, Mail, Settings } from 'lucide-react';

export default function NotesApp() {
  const menuItems = [
    { name: 'NOTES', href: '#' },
    { name: 'MESSAGES', href: '#' },
    { name: 'PLANNER', href: '#' },
    { name: 'PROJECT\nMANAGER', href: '#' },
    { name: 'FILES', href: '#' }
  ];

  const notes = [
    { id: 1, creator: '***', lastUpdated: '***' },
    { id: 2, creator: '***', lastUpdated: '***' },
    { id: 3, creator: '***', lastUpdated: '***' }
  ];

  return (
    <div className="bg-orange-400 border border-black w-[600px] h-[500px] m-12 relative">
      {/* Header */}
      <div className="float-right p-2">
        <div className="flex items-center space-x-1">
          <span className="mr-2 text-black font-bold">TEAM</span>
          {/* Team member icons */}
          {[...Array(5)].map((_, i) => (
            <User key={i} size={25} className="text-black" />
          ))}
          <Plus size={25} className="text-black ml-2" />
          <div className="ml-4 flex space-x-1">
            <Mail size={25} className="text-black" />
            <Settings size={25} className="text-black" />
            <User size={25} className="text-black" />
          </div>
        </div>
      </div>

      <div className="clear-both pt-12">
        {/* Left sidebar menu */}
        <div className="float-left">
          <table>
            <tbody>
              {menuItems.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black text-center w-24 p-2 bg-white">
                    <a 
                      href={item.href} 
                      className="text-black no-underline hover:text-black visited:text-black block whitespace-pre-line text-sm"
                    >
                      {item.name}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Main content area */}
        <div className="float-right bg-gray-300 w-[470px] h-[460px]">
          <p className="text-center pt-2 font-bold">NOTES</p>
          
          {/* Notes container */}
          <div className="bg-white mx-6 mt-4 h-[88%] p-4">
            {notes.map((note) => (
              <div key={note.id} className="mb-2 text-sm">
                Note {note.id} Creator: {note.creator} Last Updated {note.lastUpdated}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}