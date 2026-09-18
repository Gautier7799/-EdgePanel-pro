import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, MessageCircle, Plus, Star, UserPlus } from 'lucide-react';
import { ContactItem } from '../../types';

interface ContactsEdgeProps {
  contacts: ContactItem[];
  onAction: (contact: ContactItem, action: 'call' | 'sms' | 'whatsapp' | 'email') => void;
  onAddContact: (contact: Partial<ContactItem>) => void;
}

export const ContactsEdge: React.FC<ContactsEdgeProps> = ({
  contacts,
  onAction,
  onAddContact,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    onAddContact({
      name,
      phone,
      relationship: relationship || 'صديق',
      avatarInitial: name.trim()[0] || 'ع',
      avatarBg: 'bg-gradient-to-tr from-cyan-500 to-indigo-600',
      isFavorite: true,
    });
    setName('');
    setPhone('');
    setRelationship('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col h-full text-slate-100 select-none">
      {/* Header */}
      <div className="px-3 pt-2 pb-2 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-200">
          جهات الاتصال المفضلة ({contacts.length})
        </span>
        <button
          onClick={() => setShowAddModal(true)}
          className="p-1 rounded-lg bg-white/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white transition-colors"
          title="إضافة جهة اتصال"
        >
          <UserPlus className="w-4 h-4" />
        </button>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-2.5 custom-scrollbar">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            id={`contact-card-${contact.id}`}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all flex flex-col gap-2"
          >
            <div className="flex items-center gap-2.5">
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-2xl ${contact.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md`}>
                {contact.avatarInitial}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-white truncate">
                    {contact.name}
                  </span>
                  {contact.isFavorite && (
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                  )}
                </div>
                <span className="text-[10px] text-slate-400 block truncate font-mono">
                  {contact.phone}
                </span>
                <span className="text-[9px] text-cyan-300/80">
                  {contact.relationship}
                </span>
              </div>
            </div>

            {/* Quick Action Shortcuts */}
            <div className="grid grid-cols-4 gap-1.5 pt-1 border-t border-white/5">
              <button
                onClick={() => onAction(contact, 'call')}
                className="py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 flex items-center justify-center transition-colors"
                title="اتصال هاتفي"
              >
                <Phone className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onAction(contact, 'sms')}
                className="py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 flex items-center justify-center transition-colors"
                title="رسالة نصية SMS"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onAction(contact, 'whatsapp')}
                className="py-1.5 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 flex items-center justify-center transition-colors"
                title="واتساب"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onAction(contact, 'email')}
                className="py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 flex items-center justify-center transition-colors"
                title="بريد إلكتروني"
              >
                <Mail className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-30 bg-slate-950/85 backdrop-blur-md p-4 flex flex-col justify-center">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 shadow-2xl">
            <h4 className="text-sm font-bold text-white mb-2">إضافة جهة اتصال سريعة</h4>
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم الكامل"
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="رقم الهاتف (+966...)"
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
              />
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="الصفة / القرابة (اختياري)"
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
              <div className="flex gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg"
                >
                  حفظ جهة الاتصال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
