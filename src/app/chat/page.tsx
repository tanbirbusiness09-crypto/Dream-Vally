import Link from 'next/link';

export default function ChatPage() {
  return (
    <main className="w-full flex-grow flex flex-col bg-surface-container-lowest h-[calc(100vh-72px)]">
      <div className="max-w-container-max mx-auto w-full h-full flex flex-col md:flex-row border-x border-outline-variant/30 overflow-hidden">
        
        {/* Chat List Sidebar */}
        <aside className="w-full md:w-80 border-r border-outline-variant/30 flex flex-col bg-surface h-1/3 md:h-full flex-shrink-0">
          <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
            <h2 className="text-title-lg font-bold text-on-surface">Messages</h2>
            <button className="text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {/* Active Chat Item */}
            <div className="p-4 border-b border-outline-variant/30 flex gap-3 cursor-pointer bg-primary-container/10 hover:bg-primary-container/20 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg flex-shrink-0">
                A
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-on-surface truncate">Ayesha Rahman</h3>
                  <span className="text-label-sm text-primary font-bold">10:42 AM</span>
                </div>
                <p className="text-body-sm text-on-surface font-semibold truncate">Yes, the item is still available.</p>
              </div>
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            </div>

            {/* Read Chat Item */}
            <div className="p-4 border-b border-outline-variant/30 flex gap-3 cursor-pointer hover:bg-surface-container transition-colors">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center font-bold text-lg flex-shrink-0">
                F
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-on-surface truncate">Farhan Ahmed</h3>
                  <span className="text-label-sm text-on-surface-variant">Yesterday</span>
                </div>
                <p className="text-body-sm text-on-surface-variant truncate">I'll pick it up tomorrow. Thanks!</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Chat Conversation Area */}
        <div className="flex-1 flex flex-col bg-surface-container-lowest h-2/3 md:h-full">
          {/* Chat Header */}
          <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                A
              </div>
              <div>
                <h3 className="font-bold text-title-md text-on-surface">Ayesha Rahman</h3>
                <p className="text-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full inline-block"></span> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-outline hover:text-primary rounded-full hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">call</span>
              </button>
              <button className="p-2 text-outline hover:text-primary rounded-full hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>

          {/* Ad Reference */}
          <Link href="/product/1" className="p-3 bg-surface-container-high border-b border-outline-variant/30 flex items-center gap-3 hover:bg-surface-container-highest transition-colors cursor-pointer">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 object-cover rounded" alt="Ad" />
            <div>
              <p className="text-label-sm text-on-surface-variant">Inquiring about:</p>
              <p className="text-body-sm font-bold text-on-surface">Fresh Organic Vegetables</p>
            </div>
            <span className="material-symbols-outlined ml-auto text-outline">chevron_right</span>
          </Link>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            <div className="text-center">
              <span className="text-label-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Today</span>
            </div>
            
            {/* Received Message */}
            <div className="flex items-start gap-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0 mt-auto">
                A
              </div>
              <div className="bg-surface-container px-4 py-2.5 rounded-2xl rounded-bl-sm text-on-surface text-body-md">
                Hi, is the price negotiable?
              </div>
              <span className="text-[10px] text-on-surface-variant mt-auto">10:40 AM</span>
            </div>

            {/* Sent Message */}
            <div className="flex items-start gap-2 max-w-[80%] self-end flex-row-reverse">
              <div className="bg-primary text-on-primary px-4 py-2.5 rounded-2xl rounded-br-sm text-body-md">
                Hello! Yes, slightly negotiable if you buy in bulk.
              </div>
              <span className="text-[10px] text-on-surface-variant mt-auto">10:41 AM</span>
            </div>
            
            {/* Received Message */}
            <div className="flex items-start gap-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0 mt-auto">
                A
              </div>
              <div className="bg-surface-container px-4 py-2.5 rounded-2xl rounded-bl-sm text-on-surface text-body-md">
                Yes, the item is still available.
              </div>
              <span className="text-[10px] text-on-surface-variant mt-auto">10:42 AM</span>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-outline-variant/30 bg-surface flex items-end gap-2">
            <button className="p-2 text-outline hover:text-primary rounded-full hover:bg-surface-container transition-colors mb-1">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <div className="flex-1 bg-surface-container-lowest border border-outline-variant focus-within:border-primary rounded-2xl px-4 py-2 flex items-center transition-colors min-h-[44px]">
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 text-body-md outline-none" 
                placeholder="Type a message..."
                rows={1}
              ></textarea>
            </div>
            <button className="w-11 h-11 bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container shadow-sm transition-colors flex-shrink-0 mb-0.5">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
