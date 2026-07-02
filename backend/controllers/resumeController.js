const fs = require('fs');
const { PdfReader } = require('pdfreader');

const extractPdfText = (filePath) => {
  return new Promise((resolve, reject) => {
    let text = '';
    new PdfReader().parseFileItems(filePath, (err, item) => {
      if (err) reject(err);
      else if (!item) resolve(text);
      else if (item.text) text += item.text + ' ';
    });
  });
};

const analyzeLocally = (resumeText, jobDescription) => {
  const resume = resumeText.toLowerCase();
  const job = jobDescription.toLowerCase();

  const techKeywords = [
    'javascript', 'react', 'node.js', 'mongodb', 'express', 'python',
    'typescript', 'docker', 'git', 'rest api', 'css', 'html', 'sql',
    'aws', 'ci/cd', 'agile', 'scrum', 'linux', 'redux', 'graphql',
    'jest', 'testing', 'postgresql', 'mysql', 'firebase', 'tailwind'
  ];

  const jobWords = job.split(/\W+/).filter(w => w.length > 3);
  const jobKeywords = [...new Set([...techKeywords.filter(k => job.includes(k)), ...jobWords.filter(w => techKeywords.includes(w))])];

  const strong_keywords = jobKeywords.filter(k => resume.includes(k));
  const missing_keywords = jobKeywords.filter(k => !resume.includes(k)).slice(0, 8);

  const match_percentage = jobKeywords.length > 0 ? Math.round((strong_keywords.length / jobKeywords.length) * 100) : 50;
  const ats_score = Math.min(100, Math.round(match_percentage * 0.7 + (resume.length > 500 ? 20 : 10) + (resume.includes('experience') ? 10 : 0)));

  const suggestions = [];
  if (missing_keywords.length > 0) suggestions.push(`Add these missing keywords to your resume: ${missing_keywords.slice(0,3).join(', ')}`);
  if (!resume.includes('github') && !resume.includes('portfolio')) suggestions.push('Add a GitHub profile or portfolio link to showcase your work');
  if (!resume.includes('%') && !resume.includes('increased') && !resume.includes('improved')) suggestions.push('Add measurable achievements with numbers and percentages');
  if (!resume.includes('team') && !resume.includes('collaborated')) suggestions.push('Mention teamwork and collaboration experience');
  suggestions.push('Tailor your resume summary to match this specific job description');

  const summary = `Your resume matches ${match_percentage}% of the job requirements. You have strong skills in ${strong_keywords.slice(0,3).join(', ') || 'several areas'}. Focus on adding the missing keywords and quantifying your achievements to improve your ATS score.`;

  return { ats_score, match_percentage, missing_keywords, strong_keywords: strong_keywords.slice(0, 8), suggestions, summary };
};

exports.analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No resume file uploaded' });
    if (!jobDescription) return res.status(400).json({ message: 'Job description is required' });

    const resumeText = await extractPdfText(req.file.path);
    fs.unlinkSync(req.file.path);

    const analysis = analyzeLocally(resumeText, jobDescription);
    res.json({ success: true, data: analysis });
  } catch (err) {
    console.error('Resume analysis error:', err.message);
    res.status(500).json({ message: 'Analysis failed: ' + err.message });
  }
};
