'use server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { checkAuth } from './admin-auth';
import { revalidatePath } from 'next/cache';

// --- Hero / About ---
export async function updateSiteContent(id: string, content: any) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  
  const { error } = await supabaseAdmin
    .from('site_content')
    .upsert({ id, content });
    
  if (error) return { success: false, error: error.message };
  revalidatePath('/');
  return { success: true };
}

export async function getSiteContent(id: string) {
  const { data } = await supabaseAdmin.from('site_content').select('*').eq('id', id).single();
  return data?.content || {};
}

// --- Projects ---
export async function addProject(project: any) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('projects').insert(project);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function getProjects() {
  const { data } = await supabaseAdmin.from('projects').select('*').order('order_index');
  return data || [];
}

export async function deleteProject(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateProject(id: string, project: any) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('projects').update(project).eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// --- Skills ---
export async function getSkills() {
  const { data } = await supabaseAdmin.from('skills').select('*').order('name');
  return data || [];
}

export async function addSkill(skill: any) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('skills').insert([{ ...skill, color: '#6366f1' }]);
  if (error) return { success: false, error: error.message };
  revalidatePath('/');
  return { success: true };
}

export async function deleteSkill(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('skills').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// --- Contact Messages ---
export async function getMessages() {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { data } = await supabaseAdmin.from('messages').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function deleteMessage(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('messages').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// --- Articles / Blog ---
export async function getArticles() {
  const { data } = await supabaseAdmin.from('articles').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function addArticle(article: any) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('articles').insert(article);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteArticle(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('articles').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateArticle(id: string, article: any) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('articles').update(article).eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// --- Storage / Uploads ---
export async function uploadImage(file: File) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from('uploads')
    .upload(filePath, file);

  if (uploadError) return { success: false, error: uploadError.message };

  const { data } = supabaseAdmin.storage
    .from('uploads')
    .getPublicUrl(filePath);

  return { success: true, url: data.publicUrl };
}

// --- Skill Categories ---
export async function getSkillCategories() {
  const { data } = await supabaseAdmin.from('skill_categories').select('*').order('name');
  return data || [];
}

export async function updateSkillCategory(id: string, category: any) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('skill_categories').update(category).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/');
  return { success: true };
}

export async function addSkillCategory(category: any) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('skill_categories').insert([category]);
  if (error) return { success: false, error: error.message };
  revalidatePath('/');
  return { success: true };
}

export async function deleteSkillCategory(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized');
  const { error } = await supabaseAdmin.from('skill_categories').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/');
  return { success: true };
}



