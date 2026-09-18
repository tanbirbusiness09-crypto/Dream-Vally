import { MOCK_DATA } from '@/lib/data';
import Link from 'next/link';

export default function PostAdPage() {
  return (
    <main className="w-full flex-grow flex flex-col items-center bg-surface-container-lowest py-10">
      <div className="max-w-3xl w-full px-margin-mobile md:px-margin-desktop">
        <h1 className="text-headline-md font-headline-md text-on-surface mb-2">Post a New Ad</h1>
        <p className="text-body-lg text-on-surface-variant mb-8">Fill in the details below to publish your advertisement.</p>

        <form className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 p-6 sm:p-8 flex flex-col gap-6">
          {/* Category Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface" htmlFor="category">Select Category *</label>
            <div className="relative">
              <select id="category" className="w-full appearance-none px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface cursor-pointer">
                <option value="">Choose a category...</option>
                {MOCK_DATA.categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
            </div>
          </div>

          {/* Title & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface" htmlFor="title">Ad Title *</label>
              <input type="text" id="title" placeholder="e.g. iPhone 13 Pro Max 128GB" className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface" htmlFor="price">Price (৳) *</label>
              <input type="number" id="price" placeholder="e.g. 85000" className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface" required />
            </div>
          </div>

          {/* Condition */}
          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface">Condition *</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="condition" value="new" className="w-5 h-5 accent-primary cursor-pointer" defaultChecked />
                <span className="text-body-md text-on-surface">New</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="condition" value="used" className="w-5 h-5 accent-primary cursor-pointer" />
                <span className="text-body-md text-on-surface">Used</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface" htmlFor="description">Description *</label>
            <textarea id="description" rows={5} placeholder="Describe your item, features, and reason for selling..." className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface resize-y" required></textarea>
          </div>

          {/* Photos */}
          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface">Upload Photos *</label>
            <div className="w-full h-32 border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:border-primary cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-3xl mb-1">add_photo_alternate</span>
              <span className="text-body-md">Click or drag photos here (Max 5)</span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface" htmlFor="location">Location *</label>
              <div className="relative">
                <select id="location" className="w-full appearance-none px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface cursor-pointer">
                  <option value="">Select District</option>
                  <optgroup label="Dhaka Division">
                    <option value="Dhaka">Dhaka</option><option value="Faridpur">Faridpur</option><option value="Gazipur">Gazipur</option><option value="Gopalganj">Gopalganj</option><option value="Kishoreganj">Kishoreganj</option><option value="Madaripur">Madaripur</option><option value="Manikganj">Manikganj</option><option value="Munshiganj">Munshiganj</option><option value="Narayanganj">Narayanganj</option><option value="Narsingdi">Narsingdi</option><option value="Rajbari">Rajbari</option><option value="Shariatpur">Shariatpur</option><option value="Tangail">Tangail</option>
                  </optgroup>
                  <optgroup label="Chattogram Division">
                    <option value="Bandarban">Bandarban</option><option value="Brahmanbaria">Brahmanbaria</option><option value="Chandpur">Chandpur</option><option value="Chattogram">Chattogram</option><option value="Comilla">Comilla</option><option value="Cox's Bazar">Cox's Bazar</option><option value="Feni">Feni</option><option value="Khagrachari">Khagrachari</option><option value="Lakshmipur">Lakshmipur</option><option value="Noakhali">Noakhali</option><option value="Rangamati">Rangamati</option>
                  </optgroup>
                  <optgroup label="Rajshahi Division">
                    <option value="Bogura">Bogura</option><option value="Joypurhat">Joypurhat</option><option value="Naogaon">Naogaon</option><option value="Natore">Natore</option><option value="Chapabawabganj">Chapabawabganj</option><option value="Pabna">Pabna</option><option value="Rajshahi">Rajshahi</option><option value="Sirajganj">Sirajganj</option>
                  </optgroup>
                  <optgroup label="Khulna Division">
                    <option value="Bagerhat">Bagerhat</option><option value="Chuadanga">Chuadanga</option><option value="Jashore">Jashore</option><option value="Jhenaidah">Jhenaidah</option><option value="Khulna">Khulna</option><option value="Kushtia">Kushtia</option><option value="Magura">Magura</option><option value="Meherpur">Meherpur</option><option value="Narail">Narail</option><option value="Satkhira">Satkhira</option>
                  </optgroup>
                  <optgroup label="Barishal Division">
                    <option value="Barguna">Barguna</option><option value="Barishal">Barishal</option><option value="Bhola">Bhola</option><option value="Jhalokati">Jhalokati</option><option value="Patuakhali">Patuakhali</option><option value="Pirojpur">Pirojpur</option>
                  </optgroup>
                  <optgroup label="Sylhet Division">
                    <option value="Habiganj">Habiganj</option><option value="Moulvibazar">Moulvibazar</option><option value="Sunamganj">Sunamganj</option><option value="Sylhet">Sylhet</option>
                  </optgroup>
                  <optgroup label="Rangpur Division">
                    <option value="Dinajpur">Dinajpur</option><option value="Gaibandha">Gaibandha</option><option value="Kurigram">Kurigram</option><option value="Lalmonirhat">Lalmonirhat</option><option value="Nilphamari">Nilphamari</option><option value="Panchagarh">Panchagarh</option><option value="Rangpur">Rangpur</option><option value="Thakurgaon">Thakurgaon</option>
                  </optgroup>
                  <optgroup label="Mymensingh Division">
                    <option value="Jamalpur">Jamalpur</option><option value="Mymensingh">Mymensingh</option><option value="Netrokona">Netrokona</option><option value="Sherpur">Sherpur</option>
                  </optgroup>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface" htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" placeholder="e.g. 017XXXXXXXX" className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface" required />
            </div>
          </div>

          <div className="border-t border-outline-variant/30 pt-6 mt-4 flex justify-end gap-4">
            <Link href="/" className="px-6 py-3 rounded-xl text-body-md font-bold text-on-surface-variant hover:bg-surface-container transition-colors">
              Cancel
            </Link>
            <button type="submit" className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-8 py-3 rounded-xl text-body-md font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">publish</span> Post Ad
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
