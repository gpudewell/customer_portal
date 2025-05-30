import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2, Edit2, Check } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

interface SiteMapPage {
  title: string;
  description: string;
  children?: SiteMapPage[];
}

interface SiteMapManagerProps {
  taskId: string;
  proposedSiteMap: Record<string, SiteMapPage>;
  onComplete: () => void;
}

const SiteMapManager: React.FC<SiteMapManagerProps> = ({
  taskId,
  proposedSiteMap,
  onComplete
}) => {
  const [siteMap, setSiteMap] = useState(proposedSiteMap);
  const [expandedPages, setExpandedPages] = useState<string[]>([]);
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ title: string; description: string }>({
    title: '',
    description: ''
  });

  const toggleExpand = (slug: string) => {
    setExpandedPages(prev =>
      prev.includes(slug)
        ? prev.filter(p => p !== slug)
        : [...prev, slug]
    );
  };

  const handleEdit = (slug: string, page: SiteMapPage) => {
    setEditingPage(slug);
    setEditForm({
      title: page.title,
      description: page.description
    });
  };

  const handleSaveEdit = (slug: string) => {
    setSiteMap(prev => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        title: editForm.title,
        description: editForm.description
      }
    }));
    setEditingPage(null);
  };

  const handleDelete = (slug: string) => {
    setSiteMap(prev => {
      const { [slug]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleAddPage = () => {
    const newSlug = `page-${Object.keys(siteMap).length + 1}`;
    setSiteMap(prev => ({
      ...prev,
      [newSlug]: {
        title: 'New Page',
        description: 'Page description'
      }
    }));
    setEditingPage(newSlug);
    setEditForm({
      title: 'New Page',
      description: 'Page description'
    });
  };

  const renderPage = (slug: string, page: SiteMapPage, depth = 0) => {
    const hasChildren = page.children && page.children.length > 0;
    const isExpanded = expandedPages.includes(slug);
    const isEditing = editingPage === slug;

    return (
      <div key={slug} className="mb-2">
        <div
          className={`flex items-start p-3 rounded-lg ${
            isEditing ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-50'
          }`}
          style={{ marginLeft: `${depth * 1.5}rem` }}
        >
          <div className="flex-grow">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Page title"
                />
                <textarea
                  value={editForm.description}
                  onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Page description"
                  rows={2}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingPage(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSaveEdit(slug)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center">
                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(slug)}
                      className="p-1 hover:bg-gray-100 rounded-full mr-2"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{page.title}</h3>
                    <p className="text-sm text-gray-500">{page.description}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          {!isEditing && (
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => handleEdit(slug, page)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(slug)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-2">
            {page.children.map((child, index) => 
              renderPage(`${slug}-${index}`, child, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Proposed Site Map</h2>
            <p className="text-sm text-gray-500">Review and modify the structure of your website</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={handleAddPage}
            >
              Add Page
            </Button>
            <Button
              variant="primary"
              leftIcon={<Check className="w-4 h-4" />}
              onClick={onComplete}
            >
              Approve Site Map
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {Object.entries(siteMap).map(([slug, page]) => renderPage(slug, page))}
        </div>
      </Card>
    </div>
  );
};

export default SiteMapManager;