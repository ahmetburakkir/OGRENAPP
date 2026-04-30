import type { QuestionDto, UserAnswerDto } from "@/shared/types/models";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  question: QuestionDto;
  answer?: UserAnswerDto; // For rank order, we might need a custom handling or save it as JSON string. Since backend expects a single string or rank per UserAnswerDto.
  // Actually, for rank order, the backend structure (from endpointanddtos.txt) says UserAnswerDto has selectedAnswer and rank. 
  // Wait, if it's multiple items to rank, they might be separate questions or a single question with multiple answers? 
  // The structure SubmitTestDto has an array of UserAnswerDto. 
  // "Ornek body: { questionId: '...', selectedAnswer: 'Kariyer Gelisimi', rank: 1 }"
  // So one UserAnswerDto per option? Wait, if it's a single questionId, can there be multiple UserAnswerDtos?
  // Let's assume we pass an array of ranks back, or for now, just build the UI.
  onChange: (val: string) => void;
}

const SortableItem = ({ id, label }: { id: string; label: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-2 bg-white border border-gray-200 rounded-md shadow-sm cursor-grab active:cursor-grabbing flex items-center"
    >
      <span className="mr-3 text-gray-400">☰</span>
      {label}
    </div>
  );
};

export const RankOrderQuestion = ({ question, answer, onChange }: Props) => {
  const options = question.options || {};
  const [items, setItems] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    // Initialize items
    const initialItems = Object.entries(options).map(([k, v]) => ({ id: k, label: String(v) }));
    if (answer?.selectedAnswer) {
      try {
        const parsed = JSON.parse(answer.selectedAnswer);
        if (Array.isArray(parsed) && parsed.length === initialItems.length) {
           setItems(parsed);
           return;
        }
      } catch (e) {
        // Ignore
      }
    }
    setItems(initialItems);
  }, [options, answer]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        onChange(JSON.stringify(newItems));
        return newItems;
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">{question.content}</h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} label={item.label} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
